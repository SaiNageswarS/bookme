import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {Github} from '../../services/github';

@Component({
  selector: 'repo-detail',
  templateUrl: 'build/app/components/repo-detail/repo-detail.html',
  providers: [],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
export class RepoDetail {
  repoDetails = {};
  constructor(public routeParams:RouteParams, public github: Github) {}

  ngOnInit() {
    this.github.getRepoForOrg(this.routeParams.get('org'), this.routeParams.get('name'))
      .subscribe(repoDetails => {
        this.repoDetails = repoDetails;
      });

  }

}
