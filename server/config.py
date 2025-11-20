import os
from datetime import timedelta

class FlaskConfig:
    # In development a default is OK, but in production set a stable secret via
    # environment variable `SECRET_KEY` so it persists across restarts.
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-change-me')
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=360)
    MYSQL_DATABASE_USER = "root"
    MYSQL_DATABASE_PASSWORD = ""
    MYSQL_DATABASE_PORT = 3306
    MYSQL_DATABASE_HOST = "localhost"
    MYSQL_DATABASE_DB = "untitledclinicdb"
    
    # JWT configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', os.environ.get('SECRET_KEY', 'dev-secret-change-me'))
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=14)

    # Optional hooks for custom password hashing/verification. Set to callables
    # (e.g., in a test or app bootstrap) if you want to use a custom hasher.
    PASSWORD_HASHER = None
    PASSWORD_VERIFY = None



    
