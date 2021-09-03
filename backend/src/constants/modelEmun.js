export const ATTACHMENT = {
  entityType: {
    asset: 'asset', usageHistory: 'usageHistory',
  },
  type: {
    photo: 'photo', attachment: 'attachment',
  },
};

export const USAGE_HISTORY = {
  status: {
    inUse: 'inUse', handedOver: 'handedOver',
  },
};

export const ASSET = {
  status: {
    inStorage: 'inStorage', inUse: 'inUse', malfunction: 'malfunction', repairing: 'repairing', resaleRequired: 'resaleRequired', void: 'void',
  },
};

export const GENERIC_OPTION = {
  group: {
    type: 'type', subType: 'subType', currencyUnit: 'currencyUnit', manufacturer: 'manufacturer', location: 'location',
  },
};

export const PURCHASE = {
  state: {
    new: 'new', old: 'old',
  },
};
