import { wrapLogs } from "../utils/classLogger.js"

function one() {
  const log = wrapLogs("one")
  log.log("one")
  return
}
function two() {
  const log = wrapLogs("two")
  const error = wrapLogs("two", "error")
  const warn = wrapLogs("two", "warn")
  error.log("some error in 2")
  warn.log("some warning in 2")
  log.log("two")
  return
}

function main() {
  const log = wrapLogs("main")
  log.log("main")
  log.log("main 2")
  log.log("main 3", { some: "payload" })
  // one()
  // two()
  return
}
main()
