import Image from "next/image";
import { FC } from "react";
import logo from "../../public/capybara.svg";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useNavStore } from "@/states/navbar.state";

const styles = {
  wrapper: `margin-right: auto p-4 w-11/12 flex justify-between items-center`,
  headerLogo: `flex items-center justify-start rounded-full`,
  logo: `rounded-lg`,
  nav: `ml-8 flex-1 flex items-center justify-start`,
  navItemsContainer: `flex `,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `text-sky-400`,
};

const tabs = ["Swap", "Deposit"];

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [tabIndex, changeTab] = useNavStore((state) => [
    state.tab,
    state.changeTab,
  ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerLogo}>
        <Image
          priority={true}
          className={styles.logo}
          src={logo}
          alt="logo"
          width={40}
          height={40}
        />
      </div>
      <div className={styles.nav}>
        <div className={styles.navItemsContainer}>
          {tabs.map((tab, index) => (
            <div
              key={tab + index}
              onClick={() => changeTab(index)}
              className={`${styles.navItem} ${
                tabIndex == index && styles.activeNavItem
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <ConnectWallet />
    </div>
  );
};

export default Navbar;
