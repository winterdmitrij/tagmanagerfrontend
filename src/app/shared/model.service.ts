import { HttpClient } from  '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

import { Instance, Tag, TagGroup } from "./model";

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    private apiServerUrl = environment.apiBaseUrl;
    selectTagGroups: TagGroup[] = [];
//    isInstanceActive?: boolean;
//    isTagGruopActive?: boolean;

    constructor(private http: HttpClient) {}

//-----Instances-----------------------------------------------------------------------------
    public getInstances(): Observable<Instance[]> {
        return this.http.get<Instance[]>(`${this.apiServerUrl}/instances/all`);
    }

    public getInstance(site: string): Observable<Instance> {
        return this.http.get<Instance>(`${this.apiServerUrl}/instances/${site}`);
    }

    public addInstance(instance: Instance): Observable<Instance> {
        return this.http.post<Instance>(`${this.apiServerUrl}/instances/add`, instance);
    }

    public updInstance(instance: Instance): Observable<Instance> {
        return this.http.put<Instance>(`${this.apiServerUrl}/instances/edit`, instance);
    }

    public delInstance(site: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/instances/delete/${site}`);
    }

    // Delete Tag Group from Instance
    public delTagGroupFromInstance(site: string, tagGroupId: string): Observable<Instance> {
        return this.http.put<Instance>(`${this.apiServerUrl}/instances/${site}/taggroups/delete/${tagGroupId}`, null);
    }

    // Add Tag Groups to Instance
    public addTagGroupsToInstance(site: string, tagGroups: TagGroup[]): Observable<Instance> {
        return this.http.put<Instance>(`${this.apiServerUrl}/instances/${site}/taggroups/add`, tagGroups);
    }

    // Tag Groups Array from AddForm
    public getSelectedTagGroup(): TagGroup[] {
        return this.selectTagGroups;
    }
    public setSelectedTagGroup(tagGroups: TagGroup[]): void {
        this.selectTagGroups = tagGroups;
    }

    //-----From Checkmk---------------
    public loadTagGroupsFromCheckmk(site: string): Observable<Instance> {
        return this.http.put<Instance>(`${this.apiServerUrl}/instances/${site}/taggroups/fromcmk`, null);
    }

    //-----To Checkmk----------------
    public loadTagGroupsToCheckmk(instance: Instance): Observable<Instance> {
        return this.http.put<Instance>(`${this.apiServerUrl}/instances/${instance.site}/taggroups/tocmk`, null);
    }

//-----Tag Groups----------------------------------------------------------------------------
    public getAllTagGroups(): Observable<TagGroup[]> {
        return this.http.get<TagGroup[]>(`${this.apiServerUrl}/taggroups/all`);
    }

    public getTagGroup(tagGroupId: string): Observable<TagGroup> {
        return this.http.get<TagGroup>(`${this.apiServerUrl}/taggroups/${tagGroupId}`);
    }

    public addTagGroup(tagGroup: TagGroup): Observable<TagGroup> {
        return this.http.post<TagGroup>(`${this.apiServerUrl}/taggroups/add`, tagGroup);
    }

    public delTagGroup(tagGroupId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/taggroups/delete/${tagGroupId}`);
    }

    public updTagGroup(tagGroup: TagGroup): Observable<TagGroup> {
        return this.http.put<TagGroup>(`${this.apiServerUrl}/taggroups/edit`, tagGroup);
    }

//-----Tags----------------------------------------------------------------------------------
    public addTag(tagGroupId: string, tag: Tag): Observable<Tag> {
        return this.http.post<Tag>(`${this.apiServerUrl}/taggroups/${tagGroupId}/tags/add`, tag);
    }

    public delTag(tagGroupId: string, tagId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/taggroups/${tagGroupId}/tags/delete/${tagId}`);
    }

    public delTag2(tagId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/tags/delete/${tagId}`);
    }

    public updTag(tagGroupId: string, tag: Tag): Observable<Tag> {
        return this.http.put<Tag>(`${this.apiServerUrl}/taggroups/${tagGroupId}/tags/edit`, tag);
    }
}