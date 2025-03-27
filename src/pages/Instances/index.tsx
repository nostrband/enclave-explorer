"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import InstanceCard from "./components/InstanceCard";
import { Instance } from "./types";
import { fetchInstances } from "@/lib/nostr";

export default function InstancesPage() {
  const [instances, setInstances] = useState<Instance[]>([]);

  useEffect(() => {
    fetchInstances().then((is) => setInstances(is));
  }, []);

  return (
    <div className="container mx-auto p-2 flex flex-col gap-3">
      <h2 className="text-lg tracking-wide text-center font-semibold uppercase">
        Active Instances
      </h2>
      <div className="flex flex-col gap-2">
        {instances.map((instance) => (
          <Link
            key={instance.event.id}
            href={`/instances/${instance.event.id}`}
          >
            <InstanceCard instance={instance} />
          </Link>
        ))}
      </div>
    </div>
  );
}
