export function WithApuleius({ text }: { text: string }) {
  return (
    <>
      {text.split(/(Apuleius)/g).map((part, i) =>
        part === "Apuleius" ? <em key={i}>Apuleius</em> : part,
      )}
    </>
  );
}
