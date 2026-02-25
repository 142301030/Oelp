import json

def generate_potato_data(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        alignment_data = json.load(f)

    with open(output_file, 'w', encoding='utf-8') as out:
        for i, entry in enumerate(alignment_data):
            # Mapping model results to keys that config.yaml can read
            task = {
                "id": f"ncert_{i+1}",
                "hindi_text": entry["hindi_sentence"],
                "choice_1": entry["top_4_matches"][0]["english_sentence"],
                "choice_2": entry["top_4_matches"][1]["english_sentence"],
                "choice_3": entry["top_4_matches"][2]["english_sentence"],
                "score": str(round(entry["top_4_matches"][0]["similarity"], 4))
            }
            out.write(json.dumps(task, ensure_ascii=False) + "\n")

generate_potato_data('e5_alignment.json', 'data.jsonl')
print("Successfully created data.jsonl with model outputs!")
