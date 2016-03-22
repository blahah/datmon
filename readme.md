# datmon

Monitors your dat processes on your local filesystem.

## Example

Install `datmon` to get started:

```
npm install -g datmon
```

Now you can start a dat called 'census'

```
$ datmon link ~/data/census_data -n census
```

And another dat called 'finances'

```
$ datmon link ~/data/finances -n finances
```

You can then list the running dats:

```
$ datmon ls
finances   running    less than a minute ago    dat://bafd737f610d03
census     running    less than a minute ago    dat://bafd737f610d03
```

To stop a dat:

```
$ datmon stop finances
$ datmon ls
finances   not running    ----                  dat://bafd737f610d03
census     running    less than a minute ago    dat://bafd737f610d03
```

## usage



`datmon ls`
`datmon link`
`datmon start`
`datmon stop`
`datmon close`
