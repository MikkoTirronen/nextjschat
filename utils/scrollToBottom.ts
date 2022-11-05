const scrollToBottom = (ref: any) => {
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default scrollToBottom;