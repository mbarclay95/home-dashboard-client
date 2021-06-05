export interface Site {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  show: boolean;
  sort: number;
  url: string;
  imagePath: string;
  s3Path: string;
  folderId: number;
}

export function createSite(params: Partial<Site>): Site {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.updatedAt ? new Date(params.updatedAt) : null,
    name: params.name ?? null,
    description: params.description ?? null,
    url: params.url ?? null,
    imagePath: params.imagePath ?? null,
    s3Path: params.s3Path ?? null,
    sort: isNaN(params.sort) ? null : Number(params.sort),
    folderId: isNaN(params.folderId) ? null : Number(params.folderId),
    show: !!params.show,
  } as Site;
}
