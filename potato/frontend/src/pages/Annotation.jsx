import data from "../data/data.json";
import { useState } from "react";
import StickyHeader from "../components/StickyHeader";
import AlignmentCard from "../components/AlignmentCard";
import { saveAnnotation } from "../services/annotationService";

export default function Annotation() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [active, setActive] = useState(0);

  const item = data[index];
  const mlWords = item.ml_sentence.split(" ");

  const handleAnswer = (ans) => {
    setAnswers([...answers, ans]);
  };

  const next = async () => {
    await saveAnnotation({
      sentence_id: index,
      answers
    });

    setAnswers([]);
    setIndex(index + 1);
  };

  return (
    <div>

      <StickyHeader
        en={item.en_sentence}
        ml={item.ml_sentence}
        active={active}
      />

      {item.alignment.map((pair, i) => (
        <div key={i} onMouseEnter={() => setActive(i)}>
          <AlignmentCard
            pair={pair}
            mlWords={mlWords}
            onAnswer={handleAnswer}
          />
        </div>
      ))}

      <button onClick={next}>Next</button>

    </div>
  );
}