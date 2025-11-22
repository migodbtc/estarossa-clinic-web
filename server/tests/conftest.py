import pytest

from app import app as flask_app
import main  # registers blueprints

from flask_jwt_extended import create_access_token


@pytest.fixture(scope='session')
def app():
    # configure app for testing
    flask_app.config['TESTING'] = True
    flask_app.config['SECRET_KEY'] = 'test-secret'
    flask_app.config['JWT_SECRET_KEY'] = 'test-secret'
    flask_app.config['DEFAULT_PER_PAGE'] = 20
    return flask_app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def auth_headers(app):
    # create a simple access token for identity '1'
    with app.app_context():
        token = create_access_token(identity='1')
    return {'Authorization': f'Bearer {token}'}
