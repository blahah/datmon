# datmon

Monitors your dat processes on your local filesystem.

## Example

Install `datmon` to get started:

```
npm install -g datmon
```

Now you can start a dat called 'census'

```
$ datmon link ~/Dropbox/census/2010 -n census
census running   just now   dat://b8f6a4178617e8618
```

And another dat called 'finances'

```
$ datmon link ~/data/finances -n finances
finances running   just now   dat://as723hsdf18s73723
```

You can then list the running dats:

```
$ datmon ls
finances   running    less than a minute ago     /Users/karissa/data/finances
  dat://b8f6a4178617e8

census     running    less than a minute ago    /Users/karissa/Dropbox/census/2010
  dat://as723hsdf18s73
```

To stop a dat:

```
$ datmon stop finances
$ datmon ls
finances   not running    ----    /Users/karissa/data/finances
  dat://bafd737f610d03

census     running    less than a minute ago    /Users/karissa/Dropbox/census/2010
  dat://bafd737f610d03
```

And to remove it from the list:

```
$ datmon rm finances
census     running    less than a minute ago     /Users/karissa/data/finances
  dat://bafd737f610d03
```

## usage


```
datmon link DIR [-n NAME]

  Create a new dat using the contents of a given DIR directory
  and begin serving it to the public network.

  -n   the name of the process (randomly generated by default)

datmon ls

  List the currently tracked dats.

datmon stop NAME

  Stop a dat with the given NAME.

datmon start NAME

  Start a dat with the given NAME.

datmon rm NAME

  Stop a dat and remove it from the list. Does not remove the file contents.

datmon close

  Stop all dats and close the daemon.
```
