import json
from datetime import datetime, date
from typing import Any, Dict, Optional

from controller import controller


def _default_serializer(obj: Any) -> str:
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    return str(obj)


def _to_json_str(value: Optional[Dict[str, Any]]) -> Optional[str]:
    if value is None:
        return None
    try:
        return json.dumps(value, default=_default_serializer, ensure_ascii=False)
    except Exception:
        # Fallback: stringify values to avoid raising in audit path
        try:
            return json.dumps({k: str(v) for k, v in value.items()}, ensure_ascii=False)
        except Exception:
            return json.dumps({'error': 'unserializable'})


def log_audit(actor_user_id: Optional[int], table_name: str, record_id: Optional[int], action: str,
              old_values: Optional[Dict[str, Any]] = None, new_values: Optional[Dict[str, Any]] = None) -> None:
    """Insert an audit entry into `audit_log` using the existing `controller` instance.

    - `actor_user_id` can be None if unknown.
    - `old_values` / `new_values` will be stored as JSON strings (or NULL).
    """
    payload = {
        'actor_user_id': int(actor_user_id) if actor_user_id is not None else None,
        'table_name': table_name,
        'record_id': int(record_id) if record_id is not None else None,
        'action': action,
        'old_values': _to_json_str(old_values),
        'new_values': _to_json_str(new_values),
    }

    try:
        controller.create('audit_log', payload)
    except Exception:
        # Audit must not break primary flow, but surface the error to logs for debugging.
        try:
            import traceback as _tb
            print("[audit] failed to write audit record for", table_name, record_id)
            _tb.print_exc()
        except Exception:
            # last-resort fallback
            try:
                print("[audit] failed (and could not print traceback)")
            except Exception:
                pass
