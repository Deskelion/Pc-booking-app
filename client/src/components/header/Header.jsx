import "./header.css";
import { ReactComponent as Logo } from '../../assets/Logo.svg';

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
              <span>ГЛАВНАЯ СТРАНИЦА</span>
            </li>
            <li className="headerListItem">
              <span>ПРАЙС ЛИСТ</span>
            </li>
            <li className="headerListItem">
              <span>НОВОСТИ И АКЦИИ</span>
            </li>
            <li className="headerListItem">
              <span>ИГРОВЫЕ ЗАЛЫ</span>
            </li>
          </ul>
        </div>                        
      </div>
    </div>
  );
};

export default Header;
