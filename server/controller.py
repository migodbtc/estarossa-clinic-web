import re
from typing import Any, Dict, List, Optional, Tuple
import pymysql.cursors
from contextlib import contextmanager

from app import mysql


def _safe_identifier(name: str) -> bool:
    """Allow only letters, numbers and underscores for identifiers."""
    return bool(re.match(r"^[A-Za-z0-9_]+$", name))


class Controller:

    def __init__(self, mysql_instance):
        self.mysql = mysql_instance
        self._pk_cache: Dict[str, Optional[str]] = {}

    @contextmanager
    def _get_cursor(self):
        """Context manager that yields `(conn, cursor)` and ensures both are closed.

        Use `with self._get_cursor(dict_cursor=True) as (conn, cur):`.
        """
        conn = mysql.connect()
        try:

            # initialize cursors using pymysql or other compatible library as fallback
            cursor_cls = pymysql.cursors.DictCursor
            cur = conn.cursor(cursor_cls) if cursor_cls else conn.cursor()
            
            try:
                # yield connection and cursor
                yield conn, cur
            finally:
                # cleanup operations
                try:
                    cur.close()
                except Exception:
                    # print error string just in case for the exception 
                    print("Error closing cursor in method _get_cursor()")
        finally:
            # cleanup pt 2
            conn.close()

    def _get_primary_key(self, table: str) -> Optional[str]:
        # checks
        if table in self._pk_cache:
            return self._pk_cache[table]

        if not _safe_identifier(table):
            raise ValueError("Bad request: invalid identifier.")

        # query execution
        with self._get_cursor() as (conn, cur):
            cur.execute(f"SHOW KEYS FROM `{table}` WHERE Key_name='PRIMARY'")
            row = cur.fetchone()
            pk = row['Column_name'] if row else None
            self._pk_cache[table] = pk
            return pk

    def create(self, table: str, data: Dict[str, Any]) -> int:
        """Insert a row into `table` using `data` keys as columns. Returns inserted id."""

        # checks
        if not _safe_identifier(table):
            raise ValueError("Bad request: invalid identifier.")
        if not data:
            raise ValueError("Bad request: payload is empty.")

        cols = [c for c in data.keys() if _safe_identifier(c)]
        if not cols:
            raise ValueError("Bad request: no valid columns in payload.")

        col_sql = ", ".join(f"`{c}`" for c in cols)
        placeholders = ", ".join(["%s"] * len(cols))
        params = tuple(data[c] for c in cols)

        # query execution
        with self._get_cursor() as (conn, cur):
            sql = f"INSERT INTO `{table}` ({col_sql}) VALUES ({placeholders})"
            cur.execute(sql, params)
            conn.commit()
            return cur.lastrowid

    def delete(self, table: str, id_value: Any, id_column: Optional[str] = None) -> int:
        """Delete a row by primary key value (or explicit id_column). Returns affected rows."""

        # checks
        if not _safe_identifier(table):
            raise ValueError("Bad request: invalid identifier.")

        pk = id_column or self._get_primary_key(table)
        if not pk:
            raise ValueError("Operation failed: primary key unavailable.")
        if not _safe_identifier(pk):
            raise ValueError("Bad request: invalid identifier.")

        sql = f"DELETE FROM `{table}` WHERE `{pk}` = %s"

        # query execution
        with self._get_cursor() as (conn, cur):
            cur.execute(sql, (id_value,))
            affected = cur.rowcount
            conn.commit()
            return affected

    def list(self, table: str, page: int = 1, per_page: int = 20) -> Dict[str, Any]:
        """Return paginated rows from `table` as a dict with metadata.

        - `page` is 1-based.
        - `per_page` defaults to 20.
        """
        if not _safe_identifier(table):
            raise ValueError("Bad request: invalid identifier.")
        if page < 1:
            page = 1
        if per_page < 1:
            per_page = 20

        offset = (page - 1) * per_page
        pk = self._get_primary_key(table)
        order_by = f"`{pk}`" if pk and _safe_identifier(pk) else "1"

        # query execution
        with self._get_cursor() as (conn, cur):
            sql = f"SELECT * FROM `{table}` ORDER BY {order_by} LIMIT %s OFFSET %s"
            cur.execute(sql, (per_page, offset))
            rows = cur.fetchall()
            
            # retrieve count for pagination metadata
            cur.execute(f"SELECT COUNT(1) as cnt FROM `{table}`")
            total = cur.fetchone()['cnt']
            return {
                'items': rows,
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page,
            }

    def get_by_id(self, table: str, id_value: Any, id_column: Optional[str] = None) -> Optional[Dict[str, Any]]:
        # checks
        if not _safe_identifier(table):
            raise ValueError("Bad request: invalid identifier.")

        pk = id_column or self._get_primary_key(table)
        if not pk:
            raise ValueError("Operation failed: primary key unavailable.")
        if not _safe_identifier(pk):
            raise ValueError("Bad request: invalid identifier.")

        # query execution
        with self._get_cursor() as (conn, cur):
            sql = f"SELECT * FROM `{table}` WHERE `{pk}` = %s LIMIT 1"
            cur.execute(sql, (id_value,))
            row = cur.fetchone()
            return row

    def find_one_by(self, table: str, column: str, value: Any) -> Optional[Dict[str, Any]]:
        """Return a single row where `column` = value or None if not found."""
        if not _safe_identifier(table) or not _safe_identifier(column):
            raise ValueError("Bad request: invalid identifier.")

        with self._get_cursor() as (conn, cur):
            sql = f"SELECT * FROM `{table}` WHERE `{column}` = %s LIMIT 1"
            cur.execute(sql, (value,))
            return cur.fetchone()

    def revoke_refresh_token(self, jti: str) -> int:
        """Mark a refresh token (stored by its jti) as revoked. Returns affected rows."""
        if not _safe_identifier('refresh_tokens'):
            raise ValueError("Bad request: invalid identifier.")
        if not isinstance(jti, str) or not jti:
            raise ValueError("Bad request: invalid token identifier.")

        with self._get_cursor() as (conn, cur):
            sql = "UPDATE `refresh_tokens` SET `revoked` = TRUE WHERE `refresh_token` = %s"
            cur.execute(sql, (jti,))
            affected = cur.rowcount
            conn.commit()
            return affected

    def update(self, table: str, data: Dict[str, Any], id_column: Optional[str] = None) -> int:
        """Update a row using `data` which must include the primary key value.

        Returns number of affected rows.
        """

        # checks
        if not _safe_identifier(table):
            raise ValueError("Bad request: invalid identifier.")
        if not data:
            raise ValueError("Bad request: payload is empty.")

        pk = id_column or self._get_primary_key(table)
        if not pk:
            raise ValueError("Operation failed: primary key unavailable.")
        if pk not in data:
            raise ValueError("Bad request: missing primary key in payload.")

        id_value = data[pk]
        set_items = []
        params: List[Any] = []
        for k, v in data.items():
            if k == pk:
                continue
            if not _safe_identifier(k):
                continue
            set_items.append(f"`{k}` = %s")
            params.append(v)

        if not set_items:
            raise ValueError("Bad request: nothing to update.")

        params.append(id_value)
        set_sql = ", ".join(set_items)

        # query execution
        with self._get_cursor() as (conn, cur):
            sql = f"UPDATE `{table}` SET {set_sql} WHERE `{pk}` = %s"
            cur.execute(sql, tuple(params))
            affected = cur.rowcount
            conn.commit()
            return affected


controller = Controller(mysql)
