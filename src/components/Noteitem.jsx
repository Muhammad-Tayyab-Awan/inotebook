function Noteitem(prop) {
  return (
    <div className="bg-red-500 px-2 py-4 flex-col rounded-lg border border-[#111827]">
      <h3 className="text-xl font-semibold justify-center items-center">
        {prop.note.title}
      </h3>
      <p>{prop.note.description}</p>
      <span>{prop.note.tag}</span>
    </div>
  );
}

export default Noteitem;
