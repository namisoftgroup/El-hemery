import { Dropdown } from "react-bootstrap";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux";

export default function UserDropDown() {
  const { t } = useTranslation();
  const { logout } = useLogout(t);
  const client = useSelector((state) => state.clientData.client);

  return (
    <Dropdown>
   <Dropdown.Toggle className="user_dropdown">
        <span className="ms-2">{client?.name || t("header.myAccount")}</span>
        <i className="fa fa-chevron-down"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="custom-dropdown-menu text-end">
        <Dropdown.Item as={Link} to="/profile">
          <i className="fa-regular fa-user"></i>
          {t("header.myAccount")}
        </Dropdown.Item>

        <Dropdown.Item as={Link} to="/daus">
          <i className="fa-solid fa-book-quran"></i>
          {t("header.duaa")}
        </Dropdown.Item>

        <Dropdown.Item as={Link} to="/notifications">
          <i className="fa-regular fa-bell"></i>
          {t("header.notifications")}
        </Dropdown.Item>

        <Dropdown.Item as={"div"} className="logout" onClick={logout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          {t("header.logout")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
