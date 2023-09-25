const mapping: Record<string, string> = {
  bookings: 'booking',
  cars: 'car',
  'car-statuses': 'car_status',
  companies: 'company',
  'operations-dashboards': 'operations_dashboard',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
