import { Grid } from "@mantine/core";
import { NavbarMinimal } from "./NavbarMinimal";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Grid gutter={5} justify="flex-start" align="center" columns={2}>
        <Grid.Col span="content">
          <NavbarMinimal />
        </Grid.Col>
        <Grid.Col span="auto">
          <Outlet />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Layout;

