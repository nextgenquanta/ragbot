export default function TextToDisplay({ content }: { content: string }) {
  // converting lines into text
  const lines = content.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        // regex to match text wrapped into double quotes
        const regex = /\*\*(.*?)\*\*/g;
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
}
