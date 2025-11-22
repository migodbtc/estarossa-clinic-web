# packages
import time
import json
import re
from datetime import datetime, date
from typing import Any, Dict, Optional
from werkzeug.security import check_password_hash, generate_password_hash

# modules
from app import app
from db.controller import controller as _controller_instance

def _log(msg: str):
    """Simple timestamped log helper used by table modules.

    Kept intentionally minimal so audit and table modules can call it
    without importing the full Flask app or adding logging configuration.
    """
    try:
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}")
    except Exception:
        # Best-effort: if time formatting fails, fall back to plain print
        try:
            print(msg)
        except Exception:
            pass

def _hash_password(password: str) -> str:
    """Hash password using app-configured hasher or Werkzeug default."""
    hasher = app.config.get('PASSWORD_HASHER')
    if callable(hasher):
        return hasher(password)
    return generate_password_hash(password)


def _verify_password(pw_hash: str, password: str) -> bool:
    """Verify password using app-configured verifier or Werkzeug default."""
    verifier = app.config.get('PASSWORD_VERIFY')
    if callable(verifier):
        try:
            return bool(verifier(pw_hash, password))
        except Exception:
            return False
    try:
        return check_password_hash(pw_hash, password)
    except Exception:
        return False

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

def _safe_identifier(name: str) -> bool:
    return bool(re.match(r"^[A-Za-z0-9_]+$", name))
