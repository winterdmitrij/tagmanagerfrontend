export interface Instance {
    site: string;
    ipAddress: string;
    secret: string;
    tagGroups?: TagGroup[];
}

export interface TagGroup {
    tagGroupId: string;
    tagGroupTitle: string;
    topic: string;
    help?: string;
    tags?: Tag[];
    selected?: boolean;
}

export interface Tag {
    tagId: string;
    tagTitle: string;
}