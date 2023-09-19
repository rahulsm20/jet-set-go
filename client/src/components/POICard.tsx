import React from "react";
import { Link } from "react-router-dom";

interface POICardProps {
  id: string;
  title: string;
  image_url: string;
}
const POICard: React.FC<POICardProps> = ({ id, title, image_url }) => {
  return (
    <Link
      className="flex flex-col justify-start items-end bg-zinc-950 hover:shadow-[#8d8dff] shadow-md  rounded-2xl gap- transition transform duration-500 hover:-translate-y-1 hover:scale-100"
      to={"/destinations/" + id}
    >
      <p className="text-3xl font-thin italic p-2 absolute bg-slate-200 backdrop-blur-xl text-zinc-950 rounded-l-xl rounded-t-xl">
        {title}
      </p>
      <img src={image_url} className="rounded-2xl" />
    </Link>
  );
};

export default POICard;
