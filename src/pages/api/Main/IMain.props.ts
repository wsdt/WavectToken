import { IControlPanelProps } from "../ControlPanel/IControlPanel.props";

export interface IMainProps extends IControlPanelProps {
    showMaintenanceMode: boolean;
    isConnectingToBlockchain: boolean;
}