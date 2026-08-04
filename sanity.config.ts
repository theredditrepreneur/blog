'use client'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schema'
import {structure} from './sanity/structure'
import {apiVersion,dataset,projectId} from './sanity/env'
export default defineConfig({
  name:'redditrepreneur',title:'The Redditrepreneur Research',basePath:'/studio',projectId,dataset,
  plugins:[structureTool({structure}),visionTool({defaultApiVersion:apiVersion})],
  schema:{types:schemaTypes},
  document:{actions:(previous,{schemaType})=>schemaType==='siteSettings'?previous.filter(action=>!['delete','duplicate'].includes(action.action||'')):previous},
})
