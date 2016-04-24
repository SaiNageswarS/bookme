import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {RepoList} from '../repo-list/repo-list';
import {RepoDetail} from '../repo-detail/repo-detail';
import {Github} from '../../services/github';

@Component({
  selector: 'repo-browser',
  templateUrl: 'build/app/components/repo-browser/repo-browser.html',
  providers: [ Github ],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
@RouteConfig([
	{path: '/:org',       component: RepoList,   name: 'RepoList'},
	{path: '/:org/:name', component: RepoDetail, name: 'RepoDetail' },
])
export class RepoBrowser {

  constructor(private router:Router, private github: Github) {}

  searchForOrg(orgName: string){
    this.github.getOrg(orgName)
      .subscribe(({name}) => {
        console.log(name);
        this.router.navigate(['RepoList', {org: orgName}])
      })
  }

}
