#!/bin/sh -e
record=$(cat ./tmpl/pac-record.html)
cat << EOF
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
    </style>
  </head>
  <body>
    <pac-record>
      $record
      <span slot="label">Антизапрет</span>
      <span slot="id">antizapret</span>
      <span slot="value">antizapret</span>
    </pac-records>
    <pac-record>
      $record
      <span slot="label">Антицензорити</span>
      <span slot="id">anticensority</span>
      <span slot="value">anticensority</span>
    </pac-records>
  </body>
</html>
EOF
