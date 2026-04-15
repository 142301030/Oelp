from flask import Blueprint, request, jsonify

annotation_bp = Blueprint("annotation", __name__)

@annotation_bp.route("/save", methods=["POST"])
def save():
    data = request.json
    
    with open("annotations.json", "a") as f:
        f.write(str(data) + "\n")
    
    return jsonify({"status": "saved"})