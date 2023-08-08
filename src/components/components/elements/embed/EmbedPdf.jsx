export const EmbedPdf = ({ base64STR }) => {
  return (
    <>
      <embed src={`data:application/pdf;base64,${base64STR}`} height={800} />
    </>
  );
};
