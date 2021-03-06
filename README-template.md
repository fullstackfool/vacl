| Statements | Branches | Functions | Lines |
| -----------|----------|-----------|-------|
| ![Statements](#statements#) | ![Branches](#branches#) | ![Functions](#functions#) | ![Lines](#lines#) |

<!-- PROJECT LOGO -->
<p align="center">
  <!--<a href="https://github.com/fullstackfool/vacl">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>-->

  <h1 align="center">Vacl</h1>
</p>

<p align="center">
  A lightweight, strictly-typed, Vue 3 ACL directives library.
  <br />
  <a href="https://github.com/fullstackfool/vacl/issues">Report Bug</a>
  ·
  <a href="https://github.com/fullstackfool/vacl/issues">Request Feature</a>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#directives">Directives</a></li>
        <li><a href="#direct-invocation">Direct Invocation</a></li>
      </ul>
    </li>
    <li><a href="#advanced-configuration">Advanced Configuration</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Vacl is a small, fast and strictly typed ACL for Vue3. It offers simple on-load
configuration for permissions and roles, with helpful template directives 
like `v-can`, `v-cannot`, etc. 

It is not a full ACL system, like [CASL](https://github.com/stalniy/casl/), 
rather an easy-to-start js accompaniment to the likes of the 
[Spatie Laravel Permissions](https://github.com/spatie/laravel-permission) package.

Vacl is designed to get you set up with frontend authorisation as fast as possible, 
so you can move on to other things in your SPA.

```html
<!---If the delete permission is matched-->
<button v-can="'delete'">Delete</button>

<!---If the staff role is matched-->
<button v-has="'staff'">Delete</button>
```


### Built With

* [TypeScript](https://github.com/microsoft/TypeScript)
* [Jest](https://github.com/facebook/jest)
* [Vue Test Utils](https://github.com/vuejs/vue-test-utils)
* [Best README Template](https://github.com/othneildrew/Best-README-Template)


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This library is for Vue3 only. If you need ACL for Vue2 please
consider one of the following:

- [vue-browser-acl](https://github.com/mblarsen/vue-browser-acl)
- [vue-gates](https://github.com/williamcruzme/vue-gates)
- [vue-acl](https://github.com/vilarinholeo/vue-acl) (No `v-can` directive)
- [casl](https://github.com/stalniy/casl/tree/master/packages/casl-vue)

### Installation

1. Install:
   ```sh
   npm install vacl
   ```
   or    
   ```sh
   yarn add vacl
   ```
   
2. Configure:
   ```js
   import VACL from 'vacl';
    
   createApp(App)
   .use(VACL, {
     permissions: ['view products', 'edit products'],
     roles: ['staff', 'editor']
   })
   .mount('#app');
   ``` 

   We are manually passing a `config` object as an example. In reality the roles and permissions
   would be generated on the server and passed to the frontend.
   
   Just ensure the `config` passed to VACL takes the following shape:

   ```ts
   {
     permissions: string[];
     roles: roles[];
   }
   ```
   
   Please note: This is a collective of the roles/permissions that the user _has_, if a match is
   unsuccessful it is assumed the user does not have that role/permission.


<!-- USAGE EXAMPLES -->
## Usage

### Directives

To show or remove an element based on permissions:

```vue
<!---If the delete permission is matched-->
<button v-can="'delete'">Delete</button>

<!---If either the delete or archive permission is matched-->
<button v-can:any="'delete,archive'">Delete</button>

<!---If both delete and archive permission is matched-->
<button v-can:all="'delete,archive'">Delete</button>
```

Roles work exactly same, using the `has` directive:

```vue
<!---If the staff role is matched-->
<button v-has="'staff'">Delete</button>

<!---If either the staff or editor role is matched-->
<button v-has:any="'staff,editor'">Delete</button>

<!---If both staff and editor role is matched-->
<button v-has:all="'staff,editor'">Delete</button>
```

There are also inverse directives, should you need them:

```vue
<!---If the delete permission is missing-->
<button v-cannot="'delete'">Contact an Admin</button>

<!---If either the delete or archive permission is missing-->
<button v-cannot:any="'delete,archive'">Contact an Admin</button>

<!---If both delete and archive permission are missing-->
<button v-cannot:all="'delete,archive'">Contact an Admin</button>
```

For roles:

```vue
<!---If the staff role is missing-->
<button v-hasnt="'staff'">Contact an Admin</button>

<!---If either the staff or editor role is missing-->
<button v-hasnt:any="'staff,editor'">Contact an Admin</button>

<!---If both staff and editor role are missing-->
<button v-hasnt:all="'staff,editor'">Contact an Admin</button>
```


### Direct Invocation

If you need something more complex you can access the Vacl instance directly:

```vue
<button v-if="$vacl.can('delete') || $vacl.has('admin')">Delete</button>
```

There are also a number of methods you can leverage on the `$vacl` instance:

| Method | Argument | Description |
| ------ | --------- | ----------- |
| `can()` |<code>string[]</code><br/><code>string</code> | Shorthand accessor for `hasAllPermissions()`. |
| `hasAllPermissions()` |<code>string[]</code><br/><code>string</code> | Assert the store has all of the passed permission(s). |
| `hasAnyPermissions()` |<code>string[]</code><br/><code>string</code> | Assert the store has any of the passed permission(s). |
| `missingAllPermissions()` |<code>string[]</code><br/><code>string</code> | Assert the store is missing all of the passed permission(s). |
| `missingAnyPermissions()` |<code>string[]</code><br/><code>string</code> | Assert the store is missing at least 1 of the passed permission(s). |
| `has()` |<code>string[]</code><br/><code>string</code> | Shorthand accessor for `hasAllRoles()`. |
| `hasAllRoles()` |<code>string[]</code><br/><code>string</code> | Assert the store has all of the passed role(s). |
| `hasAnyRoles()` |<code>string[]</code><br/><code>string</code> | Assert the store has any of the passed role(s). |
| `missingAllRoles()` |<code>string[]</code><br/><code>string</code> | Assert the store is missing all of the passed role(s). |
| `missingAnyRoles()` |<code>string[]</code><br/><code>string</code> | Assert the store is missing at least 1 of the passed role(s). |
| `getRoles()` | - | Gets the array of currently stored roles. |
| `getPermissions()` | - | Gets the array of currently stored permissions. |
| `setRoles()` | `string[]` | Overwrites the role store with the passed array. |
| `setPermissions()` | `string[]` | Overwrites the permission store with the passed array. |
| `addRoles()` |<code>string[]</code><br/><code>string</code> | Adds the given role(s) to the role store. |
| `addPermissions()` |<code>string</code><br/><code>string[]</code> | Adds the given permission(s) to the permission store. |
| `clearRoles()` | - | Clears the currently stored roles. |
| `clearPermissions()` | - | Clears the currently stored permissions. |
| `clear()` | - | Clears both the role and permission store. |



<!-- ADVANCED CONFIGURATION -->
## Advanced Configuration

When initialising (`app.use(Vacl, config)`) there are additional properties you can set:

| Property  | Default | Description |
| --------- | ------- | ----------- |
| permissions | `[ ]` | Array of permission strings that the user has, eg: `['view jobs', 'edit posts']` |
| roles | `[ ]` | Array of role strings that the user has, eg: `['admin', 'sales']` |
| forceRemove | `false` | By default a directive that fails a check, like `v-can`, will set the element to `display: hidden`. If `forceRemove` is set to `true` then the element will be removed from the DOM entirely. This might be especially desirable when using on active components, but carries the cost of removing the element from the Vue reactivity watchers. |



<!-- REACTIVITY -->
## Reactivity

There are some limitations regarding the reactivity in Vue. For instance once an element is 
removed via a custom directive (pretty much anything other than v-if) it is not currently possible to re-insert 
it should the user gain the necessary role/permission - a page refresh is required. This is an issue with 
all Vue acl-directive packages, but we are currently investigating work-arounds.



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/fullstackfool/vacl/issues) for a list of proposed 
features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, 
inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Twitter - [@FullStackFool](https://twitter.com/FullStackFool)

NPM - [https://www.npmjs.com/package/vacl](https://www.npmjs.com/package/vacl)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

Below is a list of those who have helped with excellent peer review and feedback during development.

* [nandi95](https://github.com/nandi95/)
* [sixteenstudio](https://github.com/sixteenstudio)
