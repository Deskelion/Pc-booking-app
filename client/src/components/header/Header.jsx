import "./header.css";
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerTopPart">
          <Logo className="logo" fill="#00FFFF" />
        </div>
        <div className="headerUnderPart">                                         
          <ul className="headerList">
            <li className="headerListItem">
              <Link to="/">
                <span>ГЛАВНАЯ СТРАНИЦА</span>
              </Link>              
            </li>
            <li className="headerListItem">
              <Link to="/prices">
                <span>ПРАЙС ЛИСТ</span>
              </Link> 
            </li>
            <li className="headerListItem">
              <Link to="/news">
                <span>НОВОСТИ И АКЦИИ</span>
              </Link> 
            </li>
            <li className="headerListItem">
              <Link to="/rooms">
                <span>ИГРОВЫЕ ЗАЛЫ</span>
              </Link> 
            </li>
          </ul>
        </div>                        
      </div>
    </div>
  );
};

export default Header;
