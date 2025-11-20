
# packages
from flask import Response, jsonify, redirect, render_template, url_for, request, g
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import app
import os
from datetime import timedelta
from pprint import pprint
from controller import controller
import traceback
import time

# modules
import auth
import tables.auth_users
import tables.user_profiles
import tables.appointments
import tables.medical_records
import tables.audit_log
    


@app.route('/', methods=['GET'])
def index():
    return {'status': 'ok', 'message': 'Untitled Clinic System API'}, 200

### === BOILERPLATE RUN ===
if __name__ == "__main__":
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Starting server on 0.0.0.0:5822 (debug=False)")
    try:
        app.run(debug=False, host="0.0.0.0", port=5822)
    finally:
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Server stopped")
    