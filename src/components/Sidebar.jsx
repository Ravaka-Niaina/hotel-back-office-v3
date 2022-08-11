import { Stack, styled, Typography } from "@mui/material";
import { Public } from "@mui/icons-material";
//

const bgColor = '#DDE2EA'
const greyColor = '#586e85'
const MenuSection = styled(Stack)({

})
const MainMenuTypography = styled(Typography)({
    display: 'flex',
    alignItems: "center",
    fontWeight: "700",
    color: greyColor,
    fontSize: "16px",
    "&:hover": {
        cursor: 'pointer'
    },
})

const SubMenuTypography = styled(Typography)({
    fontWeight: "500",
    color: greyColor,
    fontSize: "14px",
    "&:hover": {
        cursor: 'pointer'
    }
})
const Sidebar = () => (
    <Stack
        borderRadius={4}
        direction="column"
        spacing={4}
        padding="50px 30px 30px 30px"
        backgroundColor={`${bgColor}`}
        minHeight="100vh"
    >
        <MenuSection>
            <MainMenuTypography>
                <Public sx={{ marginRight: "15px" }} /> MySite.com
            </MainMenuTypography>
        </MenuSection>
        <MenuSection spacing={2}>
            <MainMenuTypography>
                Analitycs
            </MainMenuTypography>
            <SubMenuTypography>
                Dashboard
            </SubMenuTypography>
            <SubMenuTypography>
                Stats
            </SubMenuTypography>
            <SubMenuTypography>
                Advertising
            </SubMenuTypography>
        </MenuSection>
    </Stack>
)

export default Sidebar;