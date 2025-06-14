/*
 * This file is part of the xPack project (http://xpack.github.io).
 * Copyright (c) 2018 Liviu Ionescu. All rights reserved.
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose is hereby granted, under the terms of the MIT license.
 *
 * If a copy of the license was not distributed with this file, it can
 * be obtained from https://opensource.org/license/mit.
 */

'use strict'

/* eslint valid-jsdoc: "error" */
/* eslint max-len: [ "error", 80, { "ignoreUrls": true } ] */

// ----------------------------------------------------------------------------

/**
 * Test `xpm init`.
 */

// ----------------------------------------------------------------------------

// The `[node-tap](http://www.node-tap.org)` framework.
import { test } from 'tap'

// https://www.npmjs.com/package/del
import { deleteAsync } from 'del'

// ----------------------------------------------------------------------------

// ES6: `import { CliExitCodes } from 'cli-start-options'
// import { CliExitCodes } from '@mmomtchev/cli-start-options';
import cliStartOptionsCsj from '@mmomtchev/cli-start-options'

// ----------------------------------------------------------------------------

import { Common } from '../common.js'

// ----------------------------------------------------------------------------

const { CliExitCodes } = cliStartOptionsCsj

// ----------------------------------------------------------------------------

/**
 * Test if help content includes convert options.
 */
test('xpm help -h',
  async (t) => {
    try {
      const { code, stdout, stderr } = await Common.xpmCli([
        'init',
        '-h'
      ])
      // Check exit code.
      t.equal(code, CliExitCodes.SUCCESS, 'exit code is success')
      const outLines = stdout.split(/\r?\n/)
      t.ok(outLines.length > 9, 'has enough output')
      if (outLines.length > 9) {
        // console.log(outLines)
        t.match(outLines[1], 'create an xpm package', 'has title')
        t.match(outLines[2], 'Usage: xpm init [options...] ' +
          '[--template <xpack>] [--name <string>]', 'has Usage')
        t.match(outLines[5], 'Init options:', 'has init options')
        t.match(outLines[6], '  -t|--template <xpack>  ', 'has --template')
        t.match(outLines[7], '  -n|--name <string>  ', 'has --name')
        t.match(outLines[8], '  -p|--property <string>  ', 'has --property')
      }
      // There should be no error messages.
      t.equal(stderr, '', 'stderr is empty')
    } catch (err) {
      t.fail(err.message)
    }
    t.end()
  })

/**
 * Test if partial command recognised and expanded.
 */
test('xpm ini -h',
  async (t) => {
    try {
      const { code, stdout, stderr } = await Common.xpmCli([
        'ini',
        '-h'
      ])
      // Check exit code.
      t.equal(code, CliExitCodes.SUCCESS, 'exit code is success')
      const outLines = stdout.split(/\r?\n/)
      t.ok(outLines.length > 9, 'has enough output')
      if (outLines.length > 9) {
        // console.log(outLines)
        t.match(outLines[1], 'create an xpm package', 'has title')
        t.match(outLines[2], 'Usage: xpm init [options...] ' +
          '[--template <xpack>] [--name <string>]', 'has Usage')
      }
      // There should be no error messages.
      t.equal(stderr, '', 'stderr is empty')
    } catch (err) {
      t.fail(err.message)
    }
    t.end()
  })

test('xpm init',
  async (t) => {
    const initPath = 'tmp/tests/init'

    await deleteAsync(initPath, { force: true })

    try {
      const { code, stdout, stderr } = await Common.xpmCli([
        'init',
        '-C', initPath
      ])
      // Check exit code.
      t.equal(code, CliExitCodes.SUCCESS, 'exit code is success')
      const outLines = stdout.split(/\r?\n/)
      t.ok(outLines.length > 3, 'has enough output')
      if (outLines.length > 3) {
        // console.log(outLines)
        t.match(outLines[1], 'Creating project', 'creating')
        t.match(outLines[2], 'File \'package.json\' generated', 'package.json')
        t.match(outLines[3], 'File \'LICENSE\' generated', 'LICENSE')
      }
      // There should be no error messages.
      t.equal(stderr, '', 'stderr is empty')
    } catch (err) {
      t.fail(err.message)
    }
    t.end()
  })

// ----------------------------------------------------------------------------
