import React,{useState} from "react";

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false); 
  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleOptionClick = (option:string) => {
    onSelect(option);
    setIsOpen(false);
  };
  
  console.log(isOpen)
  return (
    <div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} 
          className={`btn m-1 normal-case bg-black btn-ghost ${isOpen ? "open" : ""}`}>
          Sort By
          <img src="/chevron-down.svg" className="w-5" />
        </label>
        <ul
          tabIndex={0}
          className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ${isOpen ? "open" : ""}`}
        >
          {options.map((option) => {
            return (
              <li>
                <a onClick={() => handleOptionClick(option)}>{option}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
