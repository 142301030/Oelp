from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    # simple dummy auth
    if data.get("username") == "admin":
        return jsonify({"status": "success"})
    
    return jsonify({"status": "fail"})