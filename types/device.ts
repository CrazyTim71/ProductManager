import type { Device, DeviceCategories, DeviceCategory } from '@prisma/client';

export interface DeviceWithCategories extends Device {
    deviceCategories: Array<DeviceCategories & {
        category: DeviceCategory;
    }>;
}
