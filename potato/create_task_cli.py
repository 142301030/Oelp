import json
import yaml  # Added yaml support
from collections import OrderedDict
import os

def yes_or_no(question):
    while True:
        reply = input(question + " (y/n): ").lower().strip()
        if reply[:1] == "y":
            return True
        if reply[:1] == "n":
            return False

def get_annotation_type():
    q = (
        "\nWhat type of annotation is this? Possible types are...\n"
        + "  multiselect -- checkboxes where users can pick 0 or more\n"
        + "  radio -- radio buttons where users must pick 1\n"
        + "  text -- free text entry box\n"
        + "  likert -- a likert scale with an order list of radio buttons\n"
        + "  bws -- best-worst scaling\n\n"
    )

    options = ("multiselect", "radio", "text", "likert", "bws")
    while True:
        reply = input(q).lower().strip()
        if reply in options:
            return reply

def get_initial_config():
    config = OrderedDict()
    config["server_name"] = "potato annotator"
    config["user_config"] = {"allow_all_users": True, "users": []}
    
    # We set this to layout_html to enable custom HTML by default
    config["layout_id"] = "layout_html"
    config["html_layout"] = "default"
    
    config["base_html_template"] = "default"
    config["header_file"] = "default"
    config["site_dir"] = "default"
    return config

def create_task_cli():
    print("\n--- Potato Task Creation CLI (Corrected) ---")
    config = get_initial_config()

    config["annotation_task_name"] = input("Name for your annotation task: ")

    while True:
        port = input("Server port (e.g., 8000): ")
        try:
            config["port"] = int(port)
            break
        except ValueError:
            print("Please enter a numeric port number.")

    data_files = []
    fname = input("Path to your data file (e.g., potato_word_align.jsonl): ")
    data_files.append(fname)
    config["data_files"] = data_files

    id_key = input("ID field name: ")
    text_key = input("Text field name (e.g., hindi_sentence): ")
    context_key = input("Context field name (e.g., english_sentence): ")

    # FIXED: Corrected "contex_key" typo
    ip = {"id_key": id_key, "text_key": text_key}
    if context_key:
        ip["context_key"] = context_key
    config["item_properties"] = ip

    config["output_annotation_dir"] = "annotation_output/"
    config["output_annotation_format"] = "jsonl"

    annotation_schemes = []
    while True:
        scheme = {}
        atype = get_annotation_type()
        desc = input("Instructions for annotators: ")
        name = input("Internal name for this category: ")

        scheme["annotation_type"] = atype
        scheme["name"] = name
        scheme["description"] = desc

        if atype in ["likert", "bws"]:
            scheme["size"] = input("Scale size: ")
        elif atype in ["multiselect", "radio"]: # FIXED: Corrected spelling
            labels = []
            while True:
                label = input("Enter a label (or leave blank to finish): ")
                if not label: break
                labels.append(label)
            scheme["labels"] = labels

        annotation_schemes.append(scheme)
        if not yes_or_no("Add more annotation types?"): break

    config["annotation_schemes"] = annotation_schemes

    while True:
        config_file = input("\nWhere to save the config file? (e.g., config.yaml): ")
        if os.path.exists(config_file) and not yes_or_no("Overwrite existing file?"):
            continue

        # FIXED: Now saves as actual YAML, not JSON
        with open(config_file, "wt") as f:
            yaml.dump(dict(config), f, default_flow_style=False, sort_keys=False)
        print(f"\nSuccess! Config saved to {config_file}")
        break

if __name__ == "__main__":
    create_task_cli()
