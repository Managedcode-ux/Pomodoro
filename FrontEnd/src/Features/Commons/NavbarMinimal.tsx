import {useState} from "react";
import {Tooltip, UnstyledButton, Stack, rem} from "@mantine/core";
import {IconHome2, IconGauge, IconDeviceDesktopAnalytics, IconFingerprint, IconCalendarStats, IconUser, IconSettings, IconLogout} from "@tabler/icons-react";
// import {MantineLogo} from "@mantine/ds";
import classes from "./NavbarMinimal.module.css";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {reset_state} from "../Users/UserSlice";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({icon: Icon, label, active, onClick}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{duration: 0}}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{width: rem(20), height: rem(20)}} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  {icon: IconHome2, label: "Home"},
  {icon: IconGauge, label: "Dashboard"},
  {icon: IconDeviceDesktopAnalytics, label: "Analytics"},
  {icon: IconCalendarStats, label: "Releases"},
  {icon: IconUser, label: "Account"},
  {icon: IconFingerprint, label: "Security"},
  {icon: IconSettings, label: "Settings"},
];

export function NavbarMinimal() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(2);
  const navigate = useNavigate();
  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        navigate(`/app/${link.label}`.toLowerCase());
      }}
    />
  ));

  const handleLogout = () => {
    dispatch(reset_state());
    navigate("/", {replace: true});
  };

  return (
    <nav className={classes.navbar}>
      {/* <Center>
        <MantineLogo type="mark" size={30} />
      </Center> */}

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account" /> */}
        {/* <NavbarLink icon={IconLogin} label="LogIn" /> */}
        <NavbarLink icon={IconLogout} label="Logout" onClick={handleLogout} />
      </Stack>
    </nav>
  );
}
