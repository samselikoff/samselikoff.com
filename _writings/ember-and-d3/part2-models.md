---
layout: default
title: "part2"
primary: false
---

Ember and D3: Building a simple dashboard
=========================================

Models
======

Now we're ready to tackle the datepicker. We want each month in our app to have a URL. So, visiting /Jan-2013 will pull up charts corresponding to January 2013. In this sense, months in our app are really resources, something like a "monthly report" resource. (This may seem strange at first, since dates or times are often represented as filters or queries on other resources; but this is another approach).

So, since "monthly report" will be a _noun_ in our app that has a URL, we'll want to create a monthly report resource (read more about resources [here](http://emberjs.com/guides/routing/defining-your-routes/#toc_resources)):

```js
App.Router.map(function() {
    this.resource('monthlyReport', { path: '/:monthlyReport_id' });
});
```

The ':monthlyReport_id' portion corresponds to the part of the URL that will be changing: `/Jan-2013`, `/Dec-2010`, and so on. We'll use these when it comes time to actually fetch data from the server.

We also need a model that represents our "monthly report". Here's how we do it:

```js
App.MonthlyReport = DS.Model.extend({
  companies: DS.hasMany('company', { async: true }),

  date: function() {
    return moment( this.get('id'), 'MMM-YYYY' );
  }.property('model'),
});
``` 

We define a `companies` property, since our report will be a report of several properties. We also define a `date` property, which is a `moment` object. [Moment.js](http://momentjs.com/) is a library we're using to help with date formatting. We add the property here because we figure we'll want to do various things with the date, and having a moment object to work with is much easier than the plan id of "Jan-2013".

Models
------

Now, we've told our monthly report it has many companies - so let's define a Company model:

```js
App.Company = DS.Model.extend({
  monthlyReport: DS.belongsTo('monthly-report'),

  name: DS.attr('string'),

  newContracts: DS.attr('number'),
  feeIncreases: DS.attr('number'),
  attritions: DS.attr('number'),
});
```

The company belongs to a monthly report, has a name ("Acme, Inc."), and has three categories of cash flow: new contracts, fee increases, and attritions.

Fixtures
--------

Great! Now we're ready to work with some data. Instead of making real server calls - which would involve whipping up some fake back-end - we'll use [ember-data's FixtureAdapter](http://emberjs.com/guides/getting-started/using-fixtures/), and populate our "server" with an array of `monthly-report` and `company` objects.

First, tell our app we're using the fixture adapter:

```js
App.ApplicationAdapter = DS.FixtureAdapter.extend({ latency: 400 });
```

As its name suggests, `latency` is a handy option that simulates a client-server delay. It helps to replicate a more realistic user experience as we build our app.

Now, we just need to provide our adapter with some fixtures - some test data. Fixtures are just arrays of objects. So, we'll make some random data, create new monthlyReport and company objects with the data, and add them to the `FIXTURES` property of our objects:

```js
var months = [],
    companies = [];

for (var year = 1990; year <= 2014; year++) {
  for (var month = 0; month < 12; month++) {
    months.push({
      id: moment([year, month]).format('MMM-YYYY'),
      companies: [year+''+month+'1', year+''+month+'2', year+''+month+'3', year+''+month+'4', year+''+month+'5']
    });

    companies.push({
      id: year+''+month+'1',
      name: 'Acme Inc',
      newContracts: Math.floor(Math.random()*1000),
      feeIncreases: Math.floor(Math.random()*1000),
      attritions: Math.floor(Math.random()*1000),
    });
    companies.push({
      id: year+''+month+'2',
      name: 'LexCorp',
      newContracts: Math.floor(Math.random()*1000),
      feeIncreases: Math.floor(Math.random()*1000),
      attritions: Math.floor(Math.random()*1000),
    });
    companies.push({
      id: year+''+month+'3',
      name: 'Stark Industries',
      newContracts: Math.floor(Math.random()*1000),
      feeIncreases: Math.floor(Math.random()*1000),
      attritions: Math.floor(Math.random()*1000),
    });
    companies.push({
      id: year+''+month+'4',
      name: 'Wayne Enterprises',
      newContracts: Math.floor(Math.random()*1000),
      feeIncreases: Math.floor(Math.random()*1000),
      attritions: Math.floor(Math.random()*1000),
    });
    companies.push({
      id: year+''+month+'5',
      name: 'Dunder Mifflin',
      newContracts: Math.floor(Math.random()*1000),
      feeIncreases: Math.floor(Math.random()*1000),
      attritions: Math.floor(Math.random()*1000),
    });
  }
}

App.Month.FIXTURES = months;
App.Company.FIXTURES = companies;
```

Now our models are loaded up and ready to go.
