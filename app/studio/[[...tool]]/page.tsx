'use client'
import {NextStudio} from 'next-sanity/studio'
import config from '@/sanity.config'
import styles from './studio.module.css'

export default function Studio(){return <div className={styles.root}><NextStudio config={config}/></div>}
