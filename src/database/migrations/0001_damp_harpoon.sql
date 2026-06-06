CREATE INDEX `inventory_items_category_id_idx` ON `inventory_items` (`category_id`);--> statement-breakpoint
CREATE INDEX `packing_list_items_list_id_sort_order_idx` ON `packing_list_items` (`packing_list_id`,`sort_order`);--> statement-breakpoint
CREATE INDEX `trip_items_trip_id_sort_order_idx` ON `trip_items` (`trip_id`,`sort_order`);--> statement-breakpoint
CREATE INDEX `trip_locations_trip_id_sort_order_idx` ON `trip_locations` (`trip_id`,`sort_order`);