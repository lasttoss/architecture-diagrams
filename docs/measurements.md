# Measurements

This repository holds diagrams, not services, so it has no harness and no run of its own. That is the
honest version of "where do the numbers come from", and it is worth being explicit about, because a
timing budget quoted next to an architecture is not a measurement.

## The numbers in these diagrams are budgets and specifications

| Number | Where it comes from |
|---|---|
| 33.3 ms per tick | Arithmetic: a 30 Hz room has `1 / 30 s` per tick. It is the budget the diagrams reason about, not a measured tick time. |
| packet loss on UDP | A property of the transport, used here to justify interpolation and quantisation. The loss rate is whatever the network does; nothing in this repository measures it. |
| a centimetre of precision | A bound the quantisation chooses, not a distribution of observed error. |
| 19.7 ms at the 99th percentile | **A measurement, not a budget** - the tick loop's p99 from `udp-realtime-gameserver`'s load run, quoted here as what a 33.3 ms budget actually costs. Reproducing it is that repository's job: this machine's run of the same command reports a p99 of 11.7 ms. |

Measured versions of the same system live next door and are linked from each diagram:

- [`udp-realtime-gameserver`](https://github.com/lasttoss/udp-realtime-gameserver) -
  [its measurements](https://github.com/lasttoss/udp-realtime-gameserver/blob/main/docs/measurements.md)
  report the tick loop's p50/p95/p99 against the 33.3 ms budget, from a 1000-bot run.
- [`rtc-media-bench`](https://github.com/lasttoss/rtc-media-bench) - join and first-frame latency
  against a real SFU, on a cluster and on loopback.
- [`nakama-go-server-kit`](https://github.com/lasttoss/nakama-go-server-kit) - a fixed-tick match loop
  whose budget arithmetic is a test, not a diagram.

## Why the sources are Mermaid

A diagram that only exists as a PNG cannot be reviewed in a pull request. Each `.mmd` here is the
source, the exported image is the artifact, and the edit happens in the diff.
