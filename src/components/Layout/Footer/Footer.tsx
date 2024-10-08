const Footer = () => {
  const footerTags = [
    "회사 소개",
    "서비스 소개",
    "광고 및 제휴",
  ];

  return (
    <footer>
      <div className="flex flex-col gap-[20px] bg-slate-100 border-slate-400 border-t-[1px] pt-[15px] pl-[10px] pb-[15px]">
        <div className="flex flex-row gap-[10px] items-end">
          <span className="text-[20px]">Yolo</span>
          <span className="text-[11px]">onBoarding Project</span>
        </div>
        <div className="flex flex-row gap-[10px]">
          {footerTags.map((footerTag, index) => (
            <div key={footerTag} className="text-[11px] text-slate-500">
              {index !== 0 && <span className="pr-[10px]">|</span>}
              {footerTag}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
