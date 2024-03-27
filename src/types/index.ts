type AllowedEndpoints = "get_inventory" | "get_products" | "create_product" | "update_product" | "get_inbound_shipment" | "create_inbound_shipment"
  | "update_inbound_shipment" | "get_orders" | "create_order" | "update_order" | "create_kit" | "update_kit" | "get_returns" | "create_return" | "update_return"
  | "get_shipping_methods" | "get_bills" | "get_warehouses" | "get_warehouse_customers" | "get_labor_activities";

export interface ClientConfig {
  onSuccess: (authCode: string) => void;
  onClose?: () => void;
  onLoad?: () => void;
  getLinkToken: () => Promise<string>;
  integrationAllowList?: string[];
  integrationBlockList?: string[];
  integrationsWithEndpoints?: AllowedEndpoints[];
  buttonId?: string;
  sandbox?: boolean;
}

interface TrackstarState {
  isLoaded: boolean;
}

export interface Trackstar {
  init: (options: ClientConfig) => void;
  open: ({
    integrationId,
  }: {
    integrationId?: string;
  }) => void;
  state: TrackstarState;
}

declare global {
  interface Window {
    Trackstar: Trackstar;
    [trackstarModalId: string]: Trackstar;
  }
}
