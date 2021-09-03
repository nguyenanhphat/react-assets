export function convertAssetDetailDataToForm(assetDetail) {
  return {
    name: assetDetail.name,
    type: assetDetail.typeId,
    subType: assetDetail.subTypeId,
    status: assetDetail.status,
    location: assetDetail.locationId,
    manufacturer: assetDetail.specification?.manufacturerId,
    model: assetDetail.specification?.model,
    serialNumber: assetDetail.specification?.serialNumber,
    uuid: assetDetail.specification?.uuid,
    warrantyPeriod: assetDetail.specification?.warrantyPeriod,
    technicalSpecification: assetDetail.specification?.technicalSpecification,
    purchasingState: assetDetail.purchase?.state,
    purchasingValue: assetDetail.purchase?.cost,
    currency: assetDetail.purchase?.costCurrencyUnitId,
    purchasingDate: assetDetail.purchase?.time,
    supplier: assetDetail.purchase?.supplierId
      ? +assetDetail.purchase?.supplierId
      : null,
    supplierContract: assetDetail.purchase?.supplierContractId
      ? +assetDetail.purchase?.supplierContractId
      : null,
  };
}

export function convertAssetDetailFormToData(formData) {
  return {
    name: formData.name,
    status: formData.status,
    typeId: formData.type,
    subTypeId: formData.subType,
    locationId: formData.location,
    model: formData.model,
    serialNumber: formData.serialNumber,
    manufacturerId: formData.manufacturer,
    uuid: formData.uuid,
    warrantyPeriod: formData.warrantyPeriod,
    technicalSpecification: formData.technicalSpecification,
    state: formData.purchasingState,
    purchaseDate: formData.purchasingDate,
    purchaseValue: formData.purchasingValue,
    costCurrencyUnitId: formData.currency,
    supplierId: formData.supplier,
    supplierContractId: formData.supplierContract,
    attachmentIds: [],
  };
}

export function convertAttachmentRawToData(
  uploadingAttachments,
  uploadedAttachments
) {
  const uploadingAttachmentIds = uploadingAttachments?.length
    ? uploadingAttachments.map(item => item.id)
    : [];
  const uploadedAttachmentIds = uploadedAttachments?.length
    ? uploadedAttachments.map(item => item.id)
    : [];
  return [...uploadingAttachmentIds, ...uploadedAttachmentIds];
}

export function convertUsageHistoryFormToData(assetId, formData) {
  return {
    assetId,
    assigneeId: formData.assignee,
    assignerId: null, //todo ask about that
    locationId: formData.location,
    usageFrom: formData.startDate,
    usageTo: formData.endDate,
    handoverContent: formData.handoverContent,
    attachmentIds: [],
  };
}

export function convertMaintenanceHistoryFormToData(assetId, formData) {
  return {
    assetId,
    cost: formData.cost,
    costCurrencyUnitId: formData.currency,
    supplierContractId: formData.supplierContract,
    supplierId: formData.supplier,
    issueDate: formData.issueDate,
    completedDate: formData.completedDate,
    details: formData.details,
  };
}
