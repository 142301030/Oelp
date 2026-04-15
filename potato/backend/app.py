from flask import Flask
from routes.annotation import annotation_bp

app = Flask(__name__)
app.register_blueprint(annotation_bp)

app.run(port=5173, debug=True)