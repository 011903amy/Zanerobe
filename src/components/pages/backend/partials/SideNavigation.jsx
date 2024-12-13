import { imgPath } from "@/components/helpers/functions-general";
import {
  LayoutDashboard,
  Megaphone,
  MousePointerClick,
  Shirt,
  UtensilsCrossed,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SideNavigation = ({ menu }) => {
  const links = [
    {
      title: "Dashboard",
      slug: "/admin/dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    {
      title: "Advertisement",
      slug: "/admin/advertisement",
      icon: <Megaphone size={16} />,
    },
    {
      title: "Clothes",
      slug: "/admin/clothe",
      icon: <Shirt size={16} />,
    },
    {
      title: "Category",
      slug: "/admin/category",
      icon: <MousePointerClick size={16} />,
    },
  ];
  return (
    <>
      <aside className="p-4 border-r border-line">
        <h4 className="text-3xl mt-5 mb-10">ZANEROBE</h4>
        <nav>
          <ul className="mt-10">
            {links.map((item, key) => (
              <li
                className={`${
                  menu === item.slug.replaceAll("/admin/", "")
                    ? "border-accent bg-accent  text-white opacity-100"
                    : ""
                } p-2 py-2 mb-2 rounded-md border border-transparent opacity-60 hover:opacity-100`}
                key={key}
              >
                <NavLink
                  to={`${item.slug}`}
                  className="flex gap-2 items-center"
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideNavigation;
