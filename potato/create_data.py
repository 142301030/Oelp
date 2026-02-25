import json

def generate_potato_data(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        alignment_data = json.load(f)

    with open(output_file, 'w', encoding='utf-8') as out:
        for i, entry in enumerate(alignment_data):
            # Map model results to keys the config can read
            # Inside create_data.py
            # Inside create_data.py
            task = {
                    "id": f"ncert_{i+1}",
                    "hindi_text": entry["hindi_sentence"],
                    "choice_1": entry["top_4_matches"][0]["english_sentence"],
                    "choice_2": entry["top_4_matches"][1]["english_sentence"],
                    "choice_3": entry["top_4_matches"][2]["english_sentence"],
                    "best_score": str(round(entry["top_4_matches"][0]["similarity"], 4)) # Changed from 'score' to 'best_score'
}
            out.write(json.dumps(task, ensure_ascii=False) + "\n")

if __name__ == "__main__":
    generate_potato_data('labse_alignment.json', 'data.jsonl')
    print("Success! data.jsonl now contains real records.")
