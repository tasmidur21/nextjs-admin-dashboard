import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import NextLink from 'next/link';
import { SidebarContext } from 'src/contexts/SidebarContext';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';

import { useAppConfig } from '@/contexts/ApplicationConfigContext';
import TextToIcon from '@/components/Icon/TextToIcon';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.textColor};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.sidebar.background};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.sidebar.textColor};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.sidebar.textColor};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.sidebar.textColor};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.sidebar.menuItemBgActive, 0.06)};
            color: ${theme.sidebar.menuItemColorActive};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.sidebar.menuItemColorActive};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {
                background: transparent;
                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const {appConfig}=useAppConfig();
  const [menuItems,setMenuItems]=useState(appConfig.appRouters.protected)
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <MenuWrapper>
        {
          menuItems?.map((_item,indexKey)=><div key={indexKey}>
            <MenuItem menuItem={_item} currentRoute={currentRoute} closeSidebar={closeSidebar}/>
          </div>)
        }
      </MenuWrapper>
    </>
  );
}

export function MenuItem({menuItem,currentRoute,closeSidebar}) {
    return(
      <>
        <List
          key={menuItem.id}
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              {
                menuItem.title
              }
            </ListSubheader>
          }
        >
          <SubMenuItem subMenuItems={menuItem?.children} closeSidebar={closeSidebar} currentRoute={currentRoute}/>
        </List>
      </>
    )
}
export function SubMenuItem({subMenuItems,currentRoute,closeSidebar}) {
  return(
    <>
      <SubMenuWrapper>
        <List component="div">
          {
            subMenuItems?.map((_item)=><>
              <ListItem component="div" key={_item.id}>
                <NextLink href={_item.path} passHref>
                  <Button
                    className={
                      currentRoute === _item.path ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={_item.icon?<TextToIcon icon={_item?.icon} ></TextToIcon>:<AppsOutlinedIcon />}
                  >
                    {_item.title}
                  </Button>
                </NextLink>
              </ListItem>
            </>)
          }
        </List>
      </SubMenuWrapper>
    </>
  )
}


export default SidebarMenu;
