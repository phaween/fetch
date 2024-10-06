
import axios from 'axios';
import path from "path";
import { processWebPage } from "./lib/processWebPage";
import { existsSync, mkdirSync } from "fs";


  var baseDir = path.resolve(__dirname, '..') + '/data';

  if (!existsSync(baseDir)){
      mkdirSync(baseDir);
  }

  const args = process.argv.slice(2);
  args.forEach(async arg => {
    try
    {
      console.log(`site: ${arg}`);
      await processWebPage(baseDir, arg);
      const now = new Date();
      console.log(`last_fetch: ${now}`);
    }
    catch(error)
    {
      if (!axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  });
